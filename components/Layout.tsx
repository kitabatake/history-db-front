import React, {ReactText} from 'react';
import NextLink from "next/link";
import {
    Box,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    Icon,
    IconButton,
    Link,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {FiActivity, FiBook, FiHome, FiMenu, FiShuffle, FiUsers,} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {useRouter} from "next/router";

interface LinkItemProps {
    name: string;
    path: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: '人物', path: '/persons', icon: FiUsers },
    { name: 'アクティビティ', path: '/activities', icon: FiActivity },
    { name: '関連', path: '/person-relations', icon: FiShuffle },
    { name: '出典', path: '/sources', icon: FiBook },
];

export default function Layout({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg='gold.100'>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/*/!* mobilenav *!/*/}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    )
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="xl" fontFamily="monospace" fontWeight="bold">
                    History DB
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link, index) => (
                <NavItem key={link.name} path={link.path} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    path: string;
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
    const router = useRouter();
    const isActive = path == router.pathname;
    return (
        <NextLink href={path}>
            <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="3"
                    mx="4"
                    my={1}
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    bg={isActive ? 'gold.200' : 'inherit'}
                    _hover={{
                        bg: 'gold.200'
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
        </NextLink>
    );
};


interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="xl" ml="8" fontFamily="monospace" fontWeight="bold">
                History DB
            </Text>
        </Flex>
    );
};