import { DefaultImage } from "@/assets/images/book-cover-not-available.png";
import * as dbSvc from "@/database/service";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Button,
    H4,
    Image,
    ListItem,
    Spacer,
    Text,
    XStack,
    YGroup,
    YStack
} from 'tamagui';

const BookListItem = ({ content }: any) => {

    const returnButtonPressHandler = async () => {
        await dbSvc.removeById(content.id)
    }

    return (
        <YGroup.Item>
            <ListItem
                padding={10}
                icon={null}
                width={'100%'}
            >
                <YStack width={'100%'}>
                    <XStack gap={'$3'}>
                        <Image
                            padding={10}
                            source={{
                                uri: content.cover
                                    ? `https://covers.openlibrary.org/b/olid/${content.cover}-M.jpg`
                                    : content.isbn
                                        ? `https://covers.openlibrary.org/b/isbn/${content.isbn}-M.jpg`
                                        : DefaultImage
                            }}
                            width={100}
                            height={150}
                        />
                        <YStack gap={5} width={'60%'}>
                            <Spacer />
                            <H4 numberOfLines={1}>{content.title}</H4>
                            <Text>{content.first_publish_year || 'No information'}</Text>
                            <Text numberOfLines={2}>{content.authors || 'No information'}</Text>
                            <Spacer />
                        </YStack>
                    </XStack>
                    <Spacer />
                    <Button iconAfter={<Ionicons name="book" size={20} />} onPress={returnButtonPressHandler} size="$3">Return</Button>
                </YStack>
            </ListItem>
        </YGroup.Item>
    )
}

export default BookListItem
