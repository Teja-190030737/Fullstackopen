import React from "react";
import { FlatList } from "react-native";

import ReviewItem from "../ReviewItem";
import ReviewItemSeparator from "../ItemSeparator";
import useAuthorizedUser from "../../hooks/useAuthorizedUser";

const UserReviewList = () => {
    const { reviews, fetchMore } = useAuthorizedUser({
        includeReviews: true,
        first: 6
    });

    const onEndReach = () => {
        fetchMore();
    };

    const reviewNodes = reviews ?
    reviews.edges.map(review => review.node) : [];

    return (
        <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ReviewItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} withButtons />}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5} />
    );
};

export default UserReviewList;