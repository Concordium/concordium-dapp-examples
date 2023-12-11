import { fetchJson, Metadata, TokenListItem } from "common-ui";
import React, { useEffect, useState } from "react";

import { CIS2Contract, ContractAddress } from "@concordium/web-sdk";
import CheckIcon from "@mui/icons-material/Check";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Cis2MetadataImageLazy from "./cis2/Cis2MetadataImageLazy";
import { toIpfsGatewayUrl } from "../utils";

type ListItem = TokenListItem & { cis2Contract: CIS2Contract };

/**
 * Displays a single token from the list of all the tokens listed on Marketplace.
 */
function MarketplaceTokensListItem(props: {
  item: ListItem;
  account: string;
  marketContractAddress: ContractAddress;
  onBuyClicked: (token: ListItem) => void;
}) {
  const { item } = props;

  const [state, setState] = useState({
    isLoading: true,
    name: "",
    desc: "",
    price: item.price,
    isBought: false,
  });

  useEffect(() => {
    const setStateMetadata = (metadata: Metadata) =>
      setState({
        ...state,
        isLoading: false,
        name: metadata.name || "",
        desc: metadata.description || "",
        price: item.price,
      });

    props.item.cis2Contract
      .tokenMetadata(props.item.tokenId)
      .then((m) => fetchJson<Metadata>(toIpfsGatewayUrl(m.url)))
      .then((metadata) => {
        setStateMetadata(metadata);
      })
      .catch(_ => setStateMetadata({} as Metadata));
  }, [props.item.cis2Contract, props.item.tokenId]);

  return (
    <ImageListItem
      sx={{ display: state.isBought ? "none" : "" }}
      key={item.tokenId + item.contract.index + item.contract.subindex}
    >
      <Cis2MetadataImageLazy account={props.account} cis2Contract={props.item.cis2Contract} tokenId={item.tokenId} />
      <ImageListItemBar
        title={`Price: ${state.price} CCD`}
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
          <IconButton
            sx={{ height: "100%" }}
            aria-label={`buy ${item.tokenId}`}
            onClick={() => item.owner !== props.account && props.onBuyClicked(item)}
          >
            {state.isBought || item.owner === props.account ? <CheckIcon /> : <ShoppingCartIcon />}
          </IconButton>
        }
      />
    </ImageListItem>
  );
}

export default MarketplaceTokensListItem;
