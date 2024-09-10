// useAreas.js
import { useQuery, gql } from "@apollo/client";

const GET_DEVICES = gql`
	#query GetDevicesByRoomId($roomId: ID!) {
	#	devices(roomId: $roomId) {
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

const useDevices = (roomId) => {
	const { data, loading, error } = useQuery(GET_DEVICES, {
		variables: {
			// roomId
			userId: roomId
		}
	});
	return {
		rooms: data?.user?.posts?.data, // data?.devices,
		loading,
		error
	};
};

export default useDevices;
