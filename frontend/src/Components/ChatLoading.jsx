import { Stack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
    return (
        <>
        <Text textAlign="center">Search a User to create chat</Text>
            <Stack>
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
                <Skeleton height="45px" />
            </Stack>
        </>
    );
};

export default ChatLoading;