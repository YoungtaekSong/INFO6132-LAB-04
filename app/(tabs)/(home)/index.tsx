import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  H2,
  Input,
  Label,
  RadioGroup,
  ScrollView,
  SizeTokens,
  XGroup,
  XStack,
  YStack
} from 'tamagui';

export default function List() {
  const safeAreaInsets = useSafeAreaInsets()
  const [searchType, setSearchType] = useState('title')
  const [searchKeyword, setSearchKeyword] = useState('')

  const bookApi = async (newSearch = false) => {
    const bookApiUrl = `https://openlibrary.org/search.json?${searchType}=${searchKeyword}&sort=new&size=10`
    const response = await fetch(bookApiUrl)
    const data = await response.json()

    console.log(bookApiUrl)

    if (response.ok) {
      if (data.num_found > 0) {
        console.log("==========")
        //console.log(data)
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

        <RadioGroup defaultValue="title" name="form" onValueChange={(e) => { setSearchType(e) }}>
          <XStack alignItems="center" space="$2">
            <RadioGroupItemWithLabel size="$3" value="title" label="Title" />
            <RadioGroupItemWithLabel size="$3" value="author" label="Author" />
          </XStack>
        </RadioGroup>

        <XGroup>
          <Input
            flex={1}
            placeholder={'Input ' + searchType}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
          <Button icon={<Ionicons name={'search'} size={24} />}
            onPress={() => bookApi(true)}
          />
        </XGroup>
      </YStack>
    </ScrollView>
  );
}

export function RadioGroupItemWithLabel(props: {
  size: SizeTokens
  value: string
  label: string
}) {
  const id = `radiogroup-${props.value}`
  return (
    <XStack width={100} alignItems="center" space="$4">
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  )
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
