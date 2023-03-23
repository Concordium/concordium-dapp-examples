import { useState } from "react";
import { useNavigate } from "react-router";
import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom";

interface IPage {
	href?: string;
	path: string;
	name: string;
	component: JSX.Element;
	display: "primary" | "secondary";
}

function PageButton(props: {
	page: IPage;
	isSelected: boolean;
	onClick: (path: string) => void;
}) {
	const { page, isSelected, onClick } = props;

	return (
		<Button
			variant={isSelected ? "outlined" : "contained"}
			key={page.name}
			onClick={() => onClick(page.href || page.path)}
			sx={{
				my: 2,
				color: "white",
				display: "block",
				borderColor: "white",
				borderRadius: "4px",
				":hover": {
					my: 2,
					color: "white",
					display: "block",
					borderColor: "white",
					borderRadius: "4px",
				},
			}}
		>
			{page.name}
		</Button>
	);
}

function Header(props: { pages: IPage[] }) {
	const StyledAppBar = styled(AppBar)({
		backgroundImage:
			'url("https://cdn-gpbbj.nitrocdn.com/eWGcFpraIsZGbNFvSyLAtmgXkWlgLXiK/assets/static/optimized/rev-c02a987/wp-content/uploads/2022/07/pexels-andrea-piacquadio-3931501-1-1.png")',
	});

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const selectedPageName = props.pages.find(
		(p) => p.href === location.pathname || p.path === location.pathname
	)?.name;

	const handleCloseNavMenu = (href?: string) => {
		setAnchorElNav(null);

		if (href) {
			navigate(href);
		}
	};
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setAnchorElNav(event.currentTarget);
	};

	return (
		<StyledAppBar position="static">
			<Container maxWidth="xl" sx={{ height: "100%" }}>
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={()=>handleCloseNavMenu("/")}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Concordium
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={() => handleCloseNavMenu()}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{props.pages.map((page) => (
								<MenuItem
									key={page.name}
									onClick={() => handleCloseNavMenu(page.href || page.path)}
									sx={{ border: "1px", borderColor: "white" }}
								>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Concordium
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{props.pages
							.filter((p) => p.display === "primary")
							.map((page) => (
								<PageButton
									key={page.name}
									page={page}
									isSelected={selectedPageName === page.name}
									onClick={(path) => handleCloseNavMenu(path)}
								/>
							))}
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							flexDirection: "row-reverse",
						}}
					>
						{props.pages
							.filter((p) => p.display === "secondary")
							.map((page) => (
								<PageButton
									key={page.name}
									page={page}
									isSelected={selectedPageName === page.name}
									onClick={(path) => handleCloseNavMenu(path)}
								/>
							))}
					</Box>
				</Toolbar>
			</Container>
			<Container sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
				<Typography variant="h2" textAlign={"center"} fontSize={40}>
					{selectedPageName}
				</Typography>
			</Container>
		</StyledAppBar>
	);
}

export default Header;
