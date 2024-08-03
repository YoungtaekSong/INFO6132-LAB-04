import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  H2,
  Input,
  ScrollView,
  XGroup,
  YStack
} from 'tamagui';

export default function List() {
  const safeAreaInsets = useSafeAreaInsets()
  const [search, setSearch] = useState('')
  const [searchType, setSearchType] = useState<'title' | 'author'>('title')
  const [searchKeyword, setSearchKeyword] = useState("harry+porter")

  const bookApi = async (newSearch = false) => {
    if (newSearch) {
      //setPage(1)
    }

    const bookApiUrl = `https://openlibrary.org/search.json?${searchType}=${searchKeyword}&sort=new&size=10`
    const response = await fetch(bookApiUrl)
    const data = await response.json()

    if (response.ok) {
      if (data.num_found > 0) {
        console.log("==========")
        console.log(data)
        console.log("==========")
      } else {
        console.log("==========")
        console.log("no result")
        console.log("==========")
      }
    } else {
      console.log("api fail")
    }
  }

  useEffect(() => {
    bookApi()
  }, [])

  return (
    <ScrollView paddingTop={safeAreaInsets.top} paddingHorizontal={20}>
      <YStack gap={10}>
        <H2>Home</H2>
        <XGroup>
          <Input
            flex={1}
            placeholder={'Input keyword'}
            value={search}
            onChangeText={setSearch}
          />
          <Button icon={<Ionicons name={'search'} size={24} />}
            onPress={() => bookApi(true)}
          />

        </XGroup>
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
