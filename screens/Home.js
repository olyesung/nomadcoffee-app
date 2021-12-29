import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import Photo from "./Photo";

const HOME_QUERY = gql`
  query SeeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      categories {
        id
        name
      }
      user {
        username
        avatarURL
      }
      photos {
        id
        url
      }
    }
  }
`;

export default function Home() {
  const { data, refetch, fetchMore, loading, updateQuery } = useQuery(
    HOME_QUERY,
    {
      variables: {
        lastId: 0,
      },
    }
  );
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  console.log(data);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() =>
          fetchMore({
            variables: {
              lastId: data?.seeCoffeeShops?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                seeCoffeeShops: [
                  ...prev.seeCoffeeShops,
                  ...fetchMoreResult.seeCoffeeShops,
                ],
              });
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
