import { Address } from "../../models/web/Events";

function AddressDisplay(props: { address: Address }): string {
    const { address } = props;
    if (address.Account) {
      return `Account: ${address.Account[0]}`;
    } else if (address.Contract) {
      return `Contract: ${address.Contract[0].index.toString()}/${address.Contract[0].subindex.toString()}`;
    }
  
    return "";
}
  
export default AddressDisplay;