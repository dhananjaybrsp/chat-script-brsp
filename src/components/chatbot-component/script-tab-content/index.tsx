import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScriptTabContent: React.FC = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/sales_bot/?chat_input=add-ons');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // if (!data) {
  //   return (
  //     <div className="text-black leading-6 mt-2 mb-4">
  //       <h3 className="m-0 text-[18px] font-semibold">Enter Service Address</h3>
  //       <p className="text-black text-sm leading-5 mt-2">Loading content...</p>
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="text-black leading-6 mt-2 mb-4">
        <h3 className="m-0 text-[18px] font-semibold">Enter Service Address</h3>
      </div>
      <div className="text-black text-sm leading-5 mt-2 mb-4">
        <p className="m-0">{data.instruction}</p>
      </div>
      {/* <div className="text-black text-sm leading-5 mt-2 mb-4">
        <p className="m-0">{data.instruction}</p>
      </div>
      <ul>
        {data['dialog script'].map((dialog: any, index: any) => (
          <div
            key={index}
            className="text-black text-sm leading-5 items-stretch rounded-t-3xl rounded-br-3xl shadow-sm bg-sky-200 justify-center mt-2 mb-4 p-4"
          >
            <p className="m-0">{dialog}</p>
          </div>
        ))}
      </ul> */}
    </>
  );
};

export default ScriptTabContent;
