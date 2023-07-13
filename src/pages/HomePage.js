import { useData } from "../context/DataContext";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import HomePageHeader from "../components/HomePageHeader";

const HomePage = () => {
  const navigate = useNavigate();

  const {
    state: { eventType, eventsData, searchKey },
  } = useData();

  console.log(eventType);

  /* Update page as per user event selection type */
  const updatedDataByDropBox = (arr) => {
    return eventType !== "both"
      ? arr.filter(
          (item) => item.eventType.toLowerCase() === eventType.toLowerCase()
        )
      : arr;
  };

  /* Update page as per user search Input */
  const updatedDataBySearchInput = (arr) =>
    searchKey.length !== "" && searchKey.length > 0
      ? arr?.filter(
          (item) =>
            item.title.toLowerCase().includes(searchKey.toLowerCase().trim()) ||
            item.eventTags.some((tag) =>
              tag.toLowerCase().includes(searchKey.toLowerCase().trim())
            )
        )
      : arr;

  const filteredData = () => {
    const filteredFuncArray = [updatedDataBySearchInput, updatedDataByDropBox];

    return filteredFuncArray.reduce((acc, curr) => curr(acc), eventsData);
  };

  const data = filteredData();

  return (
    <main className="home_container">
      <Header />
      <div className="meetUp_container">
        <HomePageHeader />

        <ul>
          {data.length > 0 ? (
            data.map((item) => (
              <li key={item.id} onClick={() => navigate(`/event/${item.id}`)}>
                <div>
                  <img
                    className="imgCover"
                    src={item.eventThumbnail}
                    alt={item.title}
                    width={"200px"}
                    height={"250px"}
                  />
                  <span>{item.eventType}</span>
                </div>
                <div>
                  <p>
                    <span>{item.eventStartTime}</span>
                  </p>
                  <p>{item.title}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No events Found!</p>
          )}
        </ul>
      </div>
    </main>
  );
};

export default HomePage;
