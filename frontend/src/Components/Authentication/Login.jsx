import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import validator from "validator";
import { jwtDecode } from "jwt-decode";
import { useToast, Link, useDisclosure, Text, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import ip from "../../ip";

const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [code, setCode] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newConfirmPassword, setNewConfirmPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();

    const Navigate = useNavigate();
    const { setUser } = ChatState();

    const forgotPassword = async () => {
        setLoading2(true);
        if (!email) {
            toast({
                title: "Please enter your email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading2(false);
            return;
        }
        if (!validator.isEmail(email)) {
            toast({
                title: "Enter a valid email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading2(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${ip()}api/user/forgotPassword`,
                { email },
                config
            );

            toast({
                title: "Request Successful",
                description: "Code sent to your email address",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading2(false);
            modal1.onClose();
            modal2.onOpen();
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading2(false);
        }
    }

    const resetPassword = async () => {
        setLoading3(true);
        if (!email || !newPassword || !newConfirmPassword || !code) {
            toast({
                title: "Please fill all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading3(false);
            return;
        }
        if (!validator.isEmail(email)) {
            toast({
                title: "Enter a valid email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading3(false);
            return;
        }
        if (newConfirmPassword !== newPassword) {
            toast({
                title: "Passwords do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading3(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.patch(
                `${ip()}api/user/resetPassword`,
                { email, newPassword, code },
                config
            );

            toast({
                title: "Password Changed Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading3(false);
            modal2.onClose();
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading3(false);
        }

    }

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (!validator.isEmail(email)) {
            toast({
                title: "Enter a valid email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${ip()}api/user/login`,
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            Navigate("/chats");
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    const googleAuth = async (credential) => {

        if(!credential || !credential.email || !credential.picture || !credential.name)
        {
            toast({
                title: "Error Occured!",
                description: "Failed to Login with Google",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const data2 = {
                email: credential.email,
                pic: credential.picture,
                name: credential.name,
            }

            const { data } = await axios.post(
                `${ip()}api/user/socialAuth`,
                data2,
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            Navigate("/chats");
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    const responseFacebook = async (response) => {
        if (!response || !response.email || !response.picture || !response.name) {
            toast({
                title: "Error Occured!",
                description: "Failed to Login with Facebook",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const data2 = {
                email: response.email,
                pic: response.picture.url,
                name: response.name,
            }

            const { data } = await axios.post(
                `${ip()}api/user/socialAuth`,
                data2,
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            Navigate("/chats");
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const resend = async () => {
        modal2.onClose();
        modal1.onOpen();
        await forgotPassword();
    }

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Link color="teal" onClick={modal1.onOpen}>
                Forgot Password
            </Link>
            <Modal isOpen={modal1.isOpen} onClose={modal1.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" mt={1}>Reset Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text ml={2}>Enter Email to get Code</Text>
                        <Input
                            my={2}
                            value={email}
                            type="email"
                            placeholder="Enter Your Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={modal1.onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue' onClick={forgotPassword} isLoading={loading2}>Send Request</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center" mt={1}>Reset Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="email" isRequired>
                            <FormLabel ml={2}>Email Address</FormLabel>
                            <Input
                                value={email}
                                type="email"
                                placeholder="Enter Your Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="code" isRequired mt={1}>
                            <FormLabel ml={2}>Code</FormLabel>
                            <Input
                                value={code}
                                type="text"
                                placeholder="Enter Your Code"
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="new-password" isRequired mt={1}>
                            <FormLabel ml={2}>New Password</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type={show ? "text" : "password"}
                                    placeholder="Enter new password"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="new-password2" isRequired mt={1} mb={3}>
                            <FormLabel ml={2}>Confirm New Password</FormLabel>
                            <InputGroup size="md">
                                <Input
                                    value={newConfirmPassword}
                                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                                    type={show ? "text" : "password"}
                                    placeholder="Enter new password"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={resend}>
                            Resend Code
                        </Button>
                        <Button colorScheme='blue' onClick={resetPassword} isLoading={loading3}>Send Request</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>

            <Box style={{ height: "0.2rem", backgroundColor: "#6e7380", margin: "2rem 1rem 1rem"}} w={{base: "18rem", md: "28rem"}}></Box>
            <Box style={{ marginTop: "-2.5rem", marginBottom: "1rem", backgroundColor: "#ffffff"}} px={{base: "1rem", md:"1.5rem"}} >Sign in with</Box>

            <GoogleOAuthProvider clientId="1020982919233-p0fl23b5vc8qj67q9eee21nikdb072n3.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        googleAuth(jwtDecode(credentialResponse.credential))
                    }}
                    onError={() => {
                        toast({
                            title: "Error Occured!",
                            description: "Failed to Login with Google",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: "bottom",
                        });
                    }}
                />
            </GoogleOAuthProvider>
            <Box my={2}>
                <FacebookLogin
                    appId="391045756956126"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                />
            </Box>
            
        </VStack>
    );
};

export default Login;