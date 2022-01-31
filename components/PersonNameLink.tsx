import {Link} from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
    id: number,
    name: string
}
const PersonNameLink = ({id, name}: Props) => (
    <NextLink href={`/persons/${id}`} passHref>
        <Link color='cyan.500'>{name}</Link>
    </NextLink>
)

export default PersonNameLink;