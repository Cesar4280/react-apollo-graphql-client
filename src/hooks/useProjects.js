// useProyectos.js
import { useQuery, gql } from "@apollo/client";

const GET_PROJECTS = gql`
	#query GetAllProjects {
	#	projects {
	#		id
	#		name
	#	}
	#}
	query GetUsers($options: PageQueryOptions) {
		users(options: $options) {
			data {
				id
				name
			}
		}
	}
`;

const useProjects = () => {
	const { data, loading, error } = useQuery(GET_PROJECTS, {
		variables: {
			options: {
				paginate: {
					page: 1,
					limit: 10
				}
			}
		}
	});
	return {
		projects: data?.users?.data, // data?.projects,
		loading,
		error
	};
};

export default useProjects;
