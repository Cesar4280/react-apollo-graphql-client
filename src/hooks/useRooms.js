// useAreas.js
import { useQuery, gql } from "@apollo/client";

const GET_ROOMS = gql`
	#query GetRoomsByProjectId($projectId: ID!) {
	#	rooms(projectId: $projectId) {
	#		id
	#		name
	#	}
	#}
	query GetUserPosts($userId: ID!) {
		user(id: $userId) {
			posts {
				data {
					id
					title
				}
			}
		}
	}
`;

const useRooms = (projectId) => {
	const { data, loading, error } = useQuery(GET_ROOMS, {
		variables: {
			// projectId
			userId: projectId
		}
	});
	return {
		rooms: data?.user?.posts?.data, // data?.rooms,
		loading,
		error
	};
};

export default useRooms;
