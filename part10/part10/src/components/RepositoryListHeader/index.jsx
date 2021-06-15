import React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

const RepositoryListHeader = ({ setOption, option }) => {
    return (
        <View>
            <Searchbar placeholder="Search..."
            onChangeText={ text => setOption({ ...option, text }) }
            value={option.text} />
            <RNPickerSelect
            onValueChange={ (value) => {
                if (value) {
                    setOption({ ...option, ...value });
                }
            } }
            items={[
                {label: 'Latest repositories', value: {orderBy: 'CREATED_AT', orderDirection: 'DESC'}},
                {label: 'Highest rated repositories', value: {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}},
                {label: 'Lowest rated repositories', value: {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}}
            ]}
            value={{orderBy: option.orderBy, orderDirection: option.orderDirection}}
            />
        </View>
    );
};

export default RepositoryListHeader;