import { useState, useEffect } from "react";
import { GET_REPOSITORY } from "../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-native";

const useRepository = () => {
    const { id } = useParams();
    const [repository, setRepository] = useState(undefined);
    const [getRepository, { loading, data }] = useLazyQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network'
    });

    const fetchRepository = (id) => {
        getRepository({ variables: { id } });
    };

    useEffect(() => {
        fetchRepository(id);
    }, []);

    useEffect(() => {
        if (!loading && data) {
            setRepository(data.repository);
        }
    }, [loading]);

    return { fetchRepository, loading, repository };
};

export default useRepository;