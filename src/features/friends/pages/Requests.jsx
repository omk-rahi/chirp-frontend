import Button from "../../../components/Button";
import Friend from "../../../components/Friend";
import LoaderSmall from "../../../components/LoaderSmall";

import {
  useAcceptRequest,
  useGetFriendRequest,
  useRejectRequest,
} from "./useFriends";

const Requests = () => {
  const { requests, isLoading: isRequestLoading } = useGetFriendRequest();
  const { acceptRequest } = useAcceptRequest();
  const { rejectRequest } = useRejectRequest();

  return (
    <div className="bg-white mt-8 max-w-7xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-900">Friend Requests</h2>
      </div>

      <div className="p-6">
        {isRequestLoading && <LoaderSmall />}
        {!isRequestLoading && requests?.length === 0 && (
          <h3 className="text-sm font-medium text-gray-900">
            No request found
          </h3>
        )}

        {!isRequestLoading && requests?.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {requests.map((request) => (
              <div
                key={request._id}
                className="relative flex flex-col sm:flex-row items-center justify-between space-x-3 border border-gray-300 bg-white px-6 py-5 hover:border-brand-500"
              >
                <Friend info={request?.sender} />
                <div className="flex gap-2 w-fit mt-3 md:mt-0">
                  <Button
                    variant="danger"
                    onClick={() => rejectRequest(request._id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => acceptRequest(request._id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
