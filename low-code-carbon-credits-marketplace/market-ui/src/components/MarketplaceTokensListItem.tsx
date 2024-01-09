import './MarketplaceTokenListItem.css';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { ConcordiumGRPCClient, ContractAddress, InstanceInfo } from '@concordium/web-sdk';
import { Dangerous, Expand, Info, ShoppingCartCheckout } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import {
    Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia, Chip, Grid,
    Tooltip, Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { TokenListItem } from '../models/CarbonCreditMarketClient';
import CCContract from '../models/CCContract';
import { getContractInformation } from '../models/ConcordiumContractClient';
import { Metadata } from '../models/ProjectNFTClient';
import { fetchJson } from '../models/Utils';
import { User } from '../types/user';
import Cis2MetadataImageLazy from './cis2/Cis2MetadataImageLazy';
import { toIpfsGatewayUrl } from '../utils';

type ListItem = TokenListItem & { cis2Contract: CCContract };

const ActionButton = (props: {
  onBuyClicked: (token: ListItem) => void;
  onReturnClicked: (token: ListItem) => void;
  item: ListItem;
  user: User;
}) => {
  const { user, item } = props;

  const Icon = () => {
    if (item.owner === user.account && item.primaryOwner === user.account) {
      return (
        <>
          <CheckIcon />
          <Tooltip title="You are the primary owner">
            <Info />
          </Tooltip>
        </>
      );
    }

    if (item.owner === user.account) {
      return <CheckIcon />;
    }

    if (item.primaryOwner === user.account) {
      return (
        <>
          <ShoppingCartCheckout />
          <Tooltip title="You are the primary owner">
            <Info />
          </Tooltip>
        </>
      );
    }

    if (user.account) {
      return <ShoppingCartCheckout />;
    }

    return <></>;
  };

  const onClicked = () => {
    if (item.owner === user.account && user.accountType === "wallet") {
      props.onReturnClicked(props.item);
    } else {
      props.onBuyClicked(props.item);
    }
  };

  return (
    <IconButton onClick={onClicked} sx={{ textAlign: "right" }}>
      <Icon />
    </IconButton>
  );
};

/**
 * Displays a single token from the list of all the tokens listed on Marketplace.
 */
function MarketplaceTokensListItem(props: {
  grpcClient: ConcordiumGRPCClient;
  onReturnClicked(item: ListItem): void;
  item: ListItem;
  marketContractAddress: ContractAddress;
  onBuyClicked: (token: ListItem) => void;
  user: User;
}) {
  const { item, user } = props;
  const [metadata, setMetadata] = useState<Metadata>();
  const [contractInfo, setContractInfo] = useState<InstanceInfo>();
  const [maturityTime, setMaturityTime] = useState<Date>();
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    getContractInformation(props.grpcClient, props.item.contract).then(setContractInfo);
    props.item.cis2Contract.maturityOf(props.item.tokenId).then(setMaturityTime);
    props.item.cis2Contract.isVerified(props.item.tokenId).then(setIsVerified);
  }, [props.item.contract]);

  useEffect(() => {
    props.item.cis2Contract
      .tokenMetadata(props.item.tokenId)
      .then((m) => fetchJson<Metadata>(toIpfsGatewayUrl(m.url)))
      .then(setMetadata)
      .catch((e) => {
        console.error(e);
        setMetadata(undefined);
      });
  }, [props.item.cis2Contract, props.item.tokenId]);

  return (
    <Grid
      item
      xs={3}
      key={item.tokenId + item.contract.index + item.contract.subindex}
      className={contractInfo?.name.replace("init_", "")}
    >
      <Card variant="elevation">
        <CardMedia>
          <Cis2MetadataImageLazy cis2Contract={props.item.cis2Contract} tokenId={item.tokenId} />
        </CardMedia>
        <CardContent>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={6} key="left" textAlign={"left"}>
              <Chip label={contractInfo?.name.replace("init_", "")} />
              <Typography className="price" variant="body1" textAlign={"left"} fontSize={"2em"} fontWeight={"bold"}>
                {item.price.toString()}&nbsp;
                <Typography component={"span"} padding={0} margin={0}>
                  CCD
                </Typography>
              </Typography>
              <Typography textAlign={"left"}>{metadata?.name}</Typography>
            </Grid>
            <Grid item xs={6} textAlign={"right"} key="right">
              <Tooltip title={"Token Id"}>
                <Typography variant="body1" component={"div"} textAlign={"right"}>
                  {item.tokenId.toString()}
                </Typography>
              </Tooltip>
              <Tooltip title={"Contract"}>
                <Typography variant="caption" component={"div"} textAlign={"right"}>
                  {item.contract.index.toString()} / {item.contract.subindex.toString()}
                </Typography>
              </Tooltip>
              <Tooltip title={`Owner: ${item.owner}`}>
                <Typography variant="caption" component={"div"} textAlign={"right"}>
                  {item.owner.slice(0, 5)}...
                </Typography>
              </Tooltip>
              <ActionButton
                user={user}
                item={props.item}
                onBuyClicked={props.onBuyClicked}
                onReturnClicked={props.onReturnClicked}
              />
            </Grid>
            <Grid item xs={12} key="middle">
              <Typography variant="body2" textAlign={"left"}>
                {metadata?.description}
              </Typography>
              <Typography variant="caption" component={"div"} textAlign={"left"}>
                {moment(maturityTime).isBefore(new Date()) ? (
                  <CheckIcon fontSize="inherit" color="success" />
                ) : (
                  <Dangerous fontSize="inherit" color="error" />
                )}
                Maturity: {maturityTime?.toLocaleString()}
              </Typography>
              <Typography variant="caption" component={"div"} textAlign={"left"}>
                {isVerified ? (
                  <CheckIcon fontSize="inherit" color="success" />
                ) : (
                  <Dangerous fontSize="inherit" color="error" />
                )}
                {isVerified ? "Verified" : "Not verified"}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={"1em"} key="bottom">
              <Accordion variant="outlined" className="attributes">
                <AccordionSummary expandIcon={<Expand />}>
                  <Typography>Attributes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {metadata?.attributes?.map((a) => (
                      <Grid item key={a.name}>
                        <Chip label={`${a.name}: ${a.value}`} />
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MarketplaceTokensListItem;
