import React, { useEffect, useState } from 'react';

import { CIS2Contract, ContractAddress } from '@concordium/web-sdk';
import { ArrowCircleRight } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { OwnedTokenListItem } from '../models/CarbonCreditMarketClient';
import { Metadata } from '../models/ProjectNFTClient';
import { fetchJson } from '../models/Utils';
import Cis2MetadataImageLazy from './cis2/Cis2MetadataImageLazy';

type ListItem = OwnedTokenListItem & { cis2Contract: CIS2Contract };

/**
 * Displays a single token from the list of all the tokens listed on Marketplace.
 */
function MarketplaceTokensListItem(props: {
  onSelected(item: ListItem): void;
  item: ListItem;
  account: string;
  marketContractAddress: ContractAddress;
}) {
  const { item } = props;

  const [state, setState] = useState({
    isLoading: true,
    url: "",
    name: "",
    desc: "",
  });

  useEffect(() => {
    const setStateMetadata = (metadata: Metadata) =>
      setState({
        ...state,
        isLoading: false,
        url: metadata.display?.url || "",
        name: metadata.name || "",
        desc: metadata.description || "",
      });

    props.item.cis2Contract
      .tokenMetadata(props.item.tokenId)
      .then((m) => fetchJson<Metadata>(m.url))
      .then((metadata) => {
        setStateMetadata(metadata);
      })
      .catch((e) => { 
        console.error(e);
        setStateMetadata({} as Metadata);
      });
  }, [props.item.cis2Contract, props.item.tokenId]);

  return (
    <ImageListItem key={item.tokenId + item.contract.index + item.contract.subindex}>
      <Cis2MetadataImageLazy cis2Contract={props.item.cis2Contract} tokenId={item.tokenId} />
      <ImageListItemBar
        position="below"
        subtitle={
          <>
            <Typography variant="caption" component={"div"}>
              {state.name}
            </Typography>
            <Typography variant="caption" component={"div"}>
              {state.desc}
            </Typography>
            <Typography variant="caption" component={"div"}>
              Index : {item.contract.index.toString()} / {item.contract.subindex.toString()}
            </Typography>
            <Typography variant="caption" component={"div"} title={item.owner}>
              Owner : {item.owner.slice(0, 5)}...
            </Typography>
          </>
        }
        actionIcon={
          <IconButton sx={{ height: "100%" }} aria-label={`buy ${item.tokenId}`} onClick={() => props.onSelected(item)}>
            <ArrowCircleRight />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}

export default MarketplaceTokensListItem;
