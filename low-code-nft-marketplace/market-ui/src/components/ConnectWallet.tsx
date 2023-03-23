import { Box, Button, Typography } from "@mui/material";

function ConnectWallet(props: { connect: () => void }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: { xs: "column", md: "row" },
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Button onClick={() => props.connect()} sx={{ display: "flex" }}>
				<Typography>Connect Wallet</Typography>
			</Button>
		</Box>
	);
}

export default ConnectWallet;
