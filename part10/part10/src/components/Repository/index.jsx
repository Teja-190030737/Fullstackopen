import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import RepositoryItem from "../RepositoryItem";
import ReviewItem from "../ReviewItem";
import ReviewItemSeparator from "../ItemSeparator";

import useRepository from "../../hooks/useRepository";
import useReviews from "../../hooks/useReviews";

const styles = StyleSheet.create({
    header: {
        marginBottom: 10
    }
});

const RepositoryInfo = ({ repository }) => {
    return <RepositoryItem {...repository} displayLink />;
};

const Repository = () => {
    const { repository }  = useRepository();
    const { id } = useParams();
    const { reviews, fetchMore } = useReviews({
        first: 3,
        id
    });

    const onEndReach = () => {
        fetchMore();
    };

    const reviewNodes = reviews ?
    reviews.edges.map(review => review.node) : [];

    return (
        <FlatList
        data={reviewNodes}
        ListHeaderComponent={ () => <RepositoryInfo repository={repository} /> }
        ListHeaderComponentStyle={styles.header}
        ItemSeparatorComponent={ReviewItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5} />
    );
};

export default Repository;