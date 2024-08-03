import { SearchContentType } from '@/constants/Types'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    H4,
    H5,
    Image,
    ListItem,
    Spacer,
    Text,
    XStack,
    YGroup,
    YStack
} from 'tamagui'

export type ContentTileProps = {
    content: SearchContentType
}

const BookListItem = ({ content }: ContentTileProps) => {
    const router = useRouter()

    const tilePressHandler = () => {
        console.log(content.cover_edition_key)
        console.log(content.author_key)
        /*
        router.push({
            pathname: `(${content.Type})/detail`,
            params: { ...content },
        })
            */
    }

    return (
        <YGroup.Item>
            <ListItem
                padding={0}
                icon={null}
                width={'100%'}
                onPress={tilePressHandler}
            >
                <XStack gap={'$4'}>
                    <Image
                        padding={10}
                        source={{ uri: `https://covers.openlibrary.org/b/olid/${content.cover_edition_key}-M.jpg` }}
                        width={100}
                        height={150}
                    />
                    <YStack gap={5} width={'60%'}>
                        <Spacer />
                        <H4 numberOfLines={1}>{content.Title}</H4>
                        <Text>{content.title}</Text>
                        <Text>{content.first_publish_year}</Text>
                        <H5>{content.cover_edition_key}</H5>
                        <Spacer />
                    </YStack>
                </XStack>
            </ListItem>
        </YGroup.Item>
    )
}

export default BookListItem
