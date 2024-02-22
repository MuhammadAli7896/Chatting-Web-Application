import {
	Box,
	Container,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Image,
	Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import logo from "../images/logo.png";

function Homepage() {
	const Navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userInfo"));

		if (user) Navigate("/chats");
	}, [Navigate]);

	return (
		<Container maxW="xl" centerContent>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				p={3}
				bg="white"
				w="100%"
				m="40px 0 15px 0px"
				borderRadius="lg"
				borderWidth="1px"
			>
				<Image src={logo} boxSize="50px" mx={3} />
				<Text fontSize="4xl" fontFamily="Work sans" textAlign={"center"}>
					Chat Nest
				</Text>
			</Box>
			<Box bg="white" w="100%" p={4} mb={6} borderRadius="lg" borderWidth="1px">
				<Tabs isFitted variant="soft-rounded">
					<TabList mb="1em">
						<Tab border={"0.3px solid #34e5eb"} >Login</Tab>
						<Tab border={"0.3px solid #34e5eb"} >Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Login />
						</TabPanel>
						<TabPanel>
							<Signup />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Container>
	);
}

export default Homepage;