import { default as axios } from 'axios';

export class PinataClient {
  constructor(private pinataJwt: string) {}

  async isJwtValid(): Promise<boolean> {
    const response = await axios({
      method: "get",
      url: "https://api.pinata.cloud/data/testAuthentication",
      headers: {
        Authorization: `Bearer ${this.pinataJwt}`,
      },
    });

    return response.status === 200;
  }

  async uploadFile(gatewayUrl: string, file: File, fileName: string): Promise<string> {
    const data = new FormData();
    data.append("file", file);
    data.append("pinataMetadata", JSON.stringify({ name: fileName }));

    const response = await axios({
      method: "post",
      url: `https://api.pinata.cloud/pinning/pinFileToIPFS`,
      headers: {
        Authorization: `Bearer ${this.pinataJwt}`,
      },
      data: data,
    });

    return this.toGatewayUrl(gatewayUrl, response.data.IpfsHash);
  }

  async uploadJson(gatewayUrl: string, json: any, fileName: string): Promise<string> {
    const data = JSON.stringify({
      pinataMetadata: {
        name: fileName,
        keyvalues: {
          imageFilename: fileName,
        },
      },
      pinataContent: json,
    });
    const response = await axios({
      method: "post",
      url: `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.pinataJwt}`,
      },
      data: data,
    });

    return this.toGatewayUrl(gatewayUrl, response.data.IpfsHash);
  }

  toGatewayUrl(gatewayUrl: string, ipfsHash: any): string {
    return `${gatewayUrl}/${ipfsHash}`;
  }
}
