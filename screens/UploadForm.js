import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";

const SEE_COFFEE_SHOPS = gql`
  fragment SeeCoffeeShops on CoffeeShop {
    id
    name
    latitude
    longitude
    photos {
      id
      url
    }
    categories {
      name
      slug
    }
    is_mine
    created_at
    updated_at
  }
`;

const CREATE_SHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $file: Upload, $category: String) {
    createCoffeeShop(name: $name, file: $file, category: $category) {
      ...SeeCoffeeShops
    }
  }
  ${SEE_COFFEE_SHOPS}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Category = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadForm({ route, navigation }) {
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
      navigation.navigate("Navigators");
    }
  };

  const [createShopMutation, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
    onError: (err) => {
      console.log(`Failed to upload photo: ${err}`);
    },
    update: updateUploadPhoto,
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );

  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("name", {
      required: true,
    });
    register("category");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ name, category }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: `image/jpeg`,
    });
    createShopMutation({
      variables: {
        name,
        file,
        category,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Category
            returnKeyType="next"
            placeholder="CoffeeShop Name..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onChangeText={(text) => setValue("name", text)}
          />
          <Category
            returnKeyType="done"
            placeholder="@Category..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onChangeText={(text) => setValue("category", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
