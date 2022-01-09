import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import Photo from "./Photo";

const SEARCH_COFFEESHOPS_QUERY = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      photos {
        id
        url
      }
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(
    SEARCH_COFFEESHOPS_QUERY
  );

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 2,
    });
  }, []);

  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "teal" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data.searchCoffeeShops.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data.searchCoffeeShops}
              keyExtractor={(shop) => shop.id.toString()}
              renderItem={renderPhoto}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
