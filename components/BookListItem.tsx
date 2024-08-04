import DefaultImage from '@/assets/images/react-logo.png'
import { SearchContentType } from '@/constants/Types'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    H4,
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
        console.log(content.key)
        console.log(content.isbn)
        console.log("-----------------")
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
                    {content.cover_edition_key ?
                        <Image
                            margin={5}
                            padding={10}
                            source={{ uri: `https://covers.openlibrary.org/b/olid/${content.cover_edition_key}-M.jpg` }}
                            width={100}
                            height={150}
                        />
                        :
                        <Image
                            margin={5}
                            padding={10}
                            source={{ uri: DefaultImage }}
                            width={100}
                            height={150}
                        />
                    }
                    <YStack gap={5} width={'60%'}>
                        <Spacer />
                        <H4 numberOfLines={1}>{content.title}</H4>
                        <Text>{content.first_publish_year}</Text>
                        <Text>{content.author}</Text>
                        <Spacer />
                    </YStack>
                </XStack>
            </ListItem>
        </YGroup.Item>
    )
}

export default BookListItem
