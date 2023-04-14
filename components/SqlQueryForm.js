import React, { useState } from "react";
import { RingLoader } from "react-spinners";

const geotags = [
  {
    name: "American Legion Post 489 Yorkville ",
    cords: [41.65765857913479, -88.42923855671488],
  },
  {
    name: 'REBOUNDS BAR & GRILL, INC. ',
    businessName: 'Rebounds Bar and Grill',
    outOfBusiness: true,
    cords: [41.65997806535055, -88.45531943862431]
  },
  {
    name: 'Rosaties of yorkville',
    cords: [41.666320181294395, -88.4408295309264]
  },
  {
    name: '1205 BRIDGE ST, INC.',
    businessName: 'Pinz',
    cords: [41.656381429074784, -88.44372572328037]
  },
  {
    name: '1901 BRIDGE ST, INC.',
    businessName: 'Roadhouse',
    cords: [41.62169335549753, -88.44905557116401]
  },
  {
    name: 'BBQ123 DBA SOUTHBANK ORIGINAL BARBEQUE LLC',
    businessName: 'Southbank BBQ',
    cords: [41.64292683891987, -88.44532359999998]
  },
  {
    name: 'BURNT BARREL, INC.',
    cords: [41.660436724173394, -88.44614399259254]
  },
  {
    name: 'Cancun Cafe & Mexican Grill Corp.',
    cords: [41.661046614867196, -88.4749619232804]
  },
  {
    name: 'Crown Pointe Amusement, LLC',
    businessName: `Tracy's`,
    numberOfEstablishments: 2,
    cords: [41.675785579142016, -88.4449577152094],
    cords2: [41.65345163703441, -88.44224024711428]
  },
  {
    name: `Donna Wood`,
    businessName: 'Paradise Cove 220',
    cords: [41.641673666537294, -88.44661291598048],
    outOfBusiness: true
  },
  {
    name: `GRAHAM C-STORES CO.`,
    businessName: 'BP Gas Station',
    cords: [41.65804807937048, -88.44209821113311]
  },
  {
    name: `Legends Sports Bar & Grill Corporation`,
    businessName: 'Legends Sports Bar & Grill',
    cords: [41.62155636011416, -88.44907960116196]
  },
  {
    name: `LENNY'S GAS N WASH YORKVILLE, LLC`,
    businessName: 'Gas N Wash',
    cords: [41.699064024655925, -88.44783254626851]
  },
  {
    name: `Mike & Denise's Pigeon Hill Diner, Inc.`,
    businessName: `Mike & Denise's`,
    cords: [41.65609097117453, -88.4305219540442]
  },
  {
    name: `MILLHURST ALE HOUSE OF YORKVILLE, INC.`,
    businessName: 'Millhurst Ale House',
    cords: [41.66756338586997, -88.44089684627022],
    outOfBusiness: true
  },
  {
    name: `RYNCART, INC.`,
    businessName: 'Wings Etc Grill & Pub',
    cords: [41.65965785828143, -88.46049172006836]
  },
  {
    name: `Silver D Inc.`,
    businessName: 'Silver Dollar Resturant',
    cords: [41.61890713043947, -88.44718808818224]
  },
  {
    name: `TCB 123 LLC`,
    businessName: `Rowdy's Bar and Grill`,
    cords: [41.64193602222798, -88.44667261117206]
  },
  {
    name: `Yorkville Moose Lodge #2371`,
    businessName: 'Yorkville Moose Lodge',
    cords: [41.65849722841686, -88.4418964586036]
  },
  {
    name: `PIZZA WORKS, INC.`,
    cords: []
  },
  {
    name: 'JDA Pizza, Inc.',
    businessName: `Suzy's Bar and Grill`,
    cords: [41.65808726678009, -88.42795459714968]
  },
  {
    name: `C.G.S., L.L.C.`,
    businessName: 'Yorkville Bowl',
    outOfBusiness: true,
    cords: [41.6560311374356, -88.44398347904723]
  },
  {
    name: `MJAM Enterprises Inc.`,
    businessName: 'Wings Etc. Grill & Pub',
    cords: [41.659642050492366, -88.46048479758839]
  },
  {
    name: `GSS MANAGEMENT COMPANY, INC.`,
    businessName: 'The Roadhouse',
    cords: [41.62161887447386, -88.44898521743683]
  },
  {
    name: `JOCEMANSOPHY INC.`,
    businessName: `Pepe's Mexican Restaurant`,
    cords: [41.65329864168527, -88.44226969580573]
  },
  {
    name: `HNM CORPORATION`,
    businessName: 'Butcher Block 360',
    outOfBusiness: true,
    cords: [41.64153481199761, -88.44489941681915]
  },
  {
    name: `Capitano Foods, LLC`,
    businessName: 'Capitano Deli & Sweets',
    outOfBusiness: true,
    cords: [41.64166845143199, -88.4466172870155]
  },
  {
    name: `PARMA HOLDINGS INC.`,
    businessName: 'Parma Pizza Bar',
    cords: [41.64167309043119, -88.4474632139956]
  },
  {
    name: `DAKOTAS BAR AND GRILL LLC`,
    businessName: 'Dakotas',
    cords: [41.64152517593435, -88.44492370146372]
  }
];

const SqlQueryForm = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [queryResults, setQueryResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query,
      }),
    };

    setLoading(true);
    const resp = await fetch("http://localhost:3005/runQuery", reqOptions);
    setLoading(false);

    const parsedResp = await resp.json();
    console.log(parsedResp);

    setQueryResults(parsedResp);
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      {loading ? <RingLoader color="#36d7b7" /> : null}
      <form className="flex flex-col w-2/5 border border-black rounded-md items-center">
        <label htmlFor="query">Sql Query</label>
        <input
          name="query"
          type="text"
          onChange={handleChange}
          value={query}
          className="border border-black pl-1 w-[95%]"
        />
        <button onClick={handleSubmit}>Run Query</button>
      </form>

      <div className="flex flex-col">
        {queryResults.map((item, i) => (
          <span key={i}>{item.Establishment}</span>
        ))}
      </div>
      <div className="w-full flex flex-col"></div>
    </div>
  );
};

export default SqlQueryForm;
