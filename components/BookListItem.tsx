import { DefaultImage } from "@/assets/images/book-cover-not-available.png"
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

const BookListItem = ({ content }: any) => {
    const router = useRouter()

    const bookItemPressHandler = () => {
        router.push({
            pathname: `/detail`,
            params: { ...content },
        })
    }

    return (
        <YGroup.Item>
            <ListItem
                padding={0}
                icon={null}
                width={'100%'}
                onPress={bookItemPressHandler}
            >
                <XStack gap={'$4'}>
                    <Image
                        padding={10}
                        source={{
                            uri: content.cover_edition_key
                                ? `https://covers.openlibrary.org/b/olid/${content.cover_edition_key}-M.jpg`
                                : content.isbn
                                    ? `https://covers.openlibrary.org/b/isbn/${content.isbn[0]}-M.jpg`
                                    : DefaultImage
                        }}
                        width={100}
                        height={150}
                    />
                    <YStack gap={5} width={'60%'}>
                        <Spacer />
                        <H4 numberOfLines={1}>{content.title}</H4>
                        <Text>{content.first_publish_year ? content.first_publish_year : 'No information'}</Text>
                        <Text numberOfLines={1}>{content.author_name ? content.author_name[0] : 'No information'}</Text>
                        <Spacer />
                    </YStack>
                </XStack>
            </ListItem>
        </YGroup.Item>
    )
}

export default BookListItem
