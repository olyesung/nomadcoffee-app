import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const PhotoFile = styled.Image`
  width: 280px;
  height: 180px;
  margin-bottom: 10px;
`;

const SubImg = styled.View`
  width: 280px;
  height: 180px;
  background-color: grey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export default function Photo({ name, categories, photos }) {
  return (
    <View>
      {photos?.length > 0 ? (
        photos.map((photo) => <PhotoFile key={photo.id} src={photo.url} />)
      ) : (
        <SubImg>
          <Text>NO image</Text>
        </SubImg>
      )}
      <Text>{name}</Text>
      {categories?.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </View>
  );
}
