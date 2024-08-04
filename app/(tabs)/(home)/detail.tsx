import { DefaultImage } from "@/assets/images/book-cover-not-available.png";
import * as dbSvc from "@/database/service";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Key, useEffect, useState } from 'react';
import {
  Button,
  H3,
  H4,
  H5,
  Image,
  Paragraph,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  XStack,
  YStack
} from 'tamagui';

import { firebaseDB } from '@/database/config';
import { collection, onSnapshot } from 'firebase/firestore';

const Detail = ({ }: any) => {
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isBorrowed, setIsBorrowed] = useState(false)
  const [allowBorrow, setAllowBorrow] = useState(false)
  const [bookId, setBookId] = useState('')
  const [error, setError] = useState('')
  const bookInfo = useLocalSearchParams<any>()

  useEffect(() => {
    fetchDetail()
  }, [])

  const fetchDetail = async () => {
    setIsLoading(true)
    getIsBorrowed()

    onSnapshot(collection(firebaseDB, "Book"), {
      next: (snapshot) => {
        const data: any[] = []
        snapshot.docs.forEach((doc) => {
          data.push({
            id: doc.data().id,
            title: doc.data().title,
            year: doc.data().year,
            authors: doc.data().authors,
            cover: doc.data().cover,
            isbn: doc.data().isbn
          })
        })
        if (data.length < 3) {
          setAllowBorrow(true)
        }
      },
    })

    const detailUrl = `https://openlibrary.org${bookInfo.key}.json`
    const response = await fetch(detailUrl)
    const data = await response.json()

    if (response.ok) {
      setContent(data)
    } else {
      setError('Sorry, an error occurred. Please try again later.')
    }

    setIsLoading(false)
  }

  const handleBorrowed = async () => {

    console.log(bookInfo)

    dbSvc.saveById(bookId, {
      id: bookId,
      title: bookInfo.title,
      year: bookInfo.first_publish_year,
      authors: bookInfo.author_name,
      cover: bookInfo.cover_edition_key || "",
      isbn: bookInfo.isbn ? bookInfo.isbn.split(',')[0] : ""
    })
    setIsBorrowed(true)
  }

  const getIsBorrowed = async () => {
    var bookId = bookInfo.key.split('/')[2]
    setBookId(bookId)
    await dbSvc.getById(bookId).then((value) => {
      if (value) {
        setIsBorrowed(true)
      }
    })
  }

  return (
    <ScrollView paddingHorizontal={0}>
      {isLoading && (
        <>
          <YStack
            padding={100}
            gap={20}
            alignItems="center"
            height={'100%'}
          >
            <Spacer />
            <Spinner size="large" scale={1.5} color={'$color10'} />
            <Spacer />
          </YStack>
        </>
      )}

      {content != null && (
        <>
          <YStack padding={10} gap={10}>
            <Image
              padding={10}
              source={{
                uri: bookInfo.cover_edition_key
                  ? `https://covers.openlibrary.org/b/olid/${bookInfo.cover_edition_key}-L.jpg`
                  : bookInfo.isbn
                    ? `https://covers.openlibrary.org/b/isbn/${bookInfo.isbn.split(',')[0]}-L.jpg`
                    : DefaultImage
              }}
              height={300}
            />

            {isBorrowed
              ? <Button iconAfter={<Ionicons name="book" size={20} />} size="$3" disabled opacity={0.5}>Borrowed</Button>
              : allowBorrow
                ? <Button iconAfter={<Ionicons name="book" size={20} />} onPress={handleBorrowed} size="$3">Borrow</Button>
                : <Button iconAfter={<Ionicons name="book" size={20} />} size="$3" disabled opacity={0.5}>Not allow to borrow</Button>
            }

            <YStack width={'100%'} gap={5}>
              <H3 numberOfLines={2}>
                {bookInfo.title}
              </H3>

              <XStack gap={10}>
                <H4>First Publish Year:</H4>
                <H5 marginTop={4}>
                  {bookInfo.first_publish_year}
                </H5>
              </XStack>

              <H4>Authors</H4>
              <Text>&nbsp;&nbsp;- {bookInfo.author_name}</Text>

              <YStack>
                <H4>Description</H4>
                <YStack padding={10}>
                  {content.description
                    ? <Paragraph>{content.description.value}</Paragraph>
                    : <Paragraph>No information</Paragraph>
                  }
                </YStack>
              </YStack>

              <YStack>
                <H4>Scripts</H4>
                {
                  content.subjects && content.subjects.length > 0
                    ? content.subjects.map((subject: any, index: Key | null | undefined) => (<Text key={index}>&nbsp;&nbsp;- {subject}</Text>))
                    : <Text>No information</Text>
                }
              </YStack>

            </YStack>
          </YStack>
        </>
      )
      }
    </ScrollView >
  )
}

export default Detail
