import BorrowedListItem from '@/components/BorrowedListItem';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  Separator,
  Spacer,
  Spinner,
  YGroup,
  YStack
} from 'tamagui';

import { firebaseDB } from '@/database/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Borrowed() {
  const safeAreaInsets = useSafeAreaInsets()
  const [isLoading, setIsLoading] = useState(false)
  const [borrowedList, setBorrowedList] = useState<any>([])
  const [bookId, setBookId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDetail()
  }, [])

  const fetchDetail = async () => {
    setIsLoading(true)

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
        setBorrowedList(data)
      },
    })

    setIsLoading(false)
  }

  return (
    <ScrollView paddingTop={safeAreaInsets.top} paddingHorizontal={20}>
      <YGroup separator={<Separator width={'100%'} borderColor={'$color5'} />} >
        {borrowedList.length > 0 &&
          borrowedList.map((book: any, index: any) => (
            <BorrowedListItem key={index} content={book} />
          ))}
      </YGroup>
      {isLoading &&
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
      }
    </ScrollView>
  );
}
