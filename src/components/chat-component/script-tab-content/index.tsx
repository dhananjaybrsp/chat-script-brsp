import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

interface ApiResponse {
	instruction?: string;
	'dialog script': string[];
}
interface ScriptTabProps {
	screenshotData: string;
	firstnameData: string;
}

const ScriptTabContent: React.FC<ScriptTabProps> = ({ screenshotData, firstnameData }) => {
	const [dataHistory, setDataHistory] = useState<ApiResponse[]>(() => {
		const storedData = localStorage.getItem('dataHistory');
		return storedData ? JSON.parse(storedData) : [];
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [titleText, setTitleText] = useState<string[]>([]);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const apiUrl = 'http://localhost:8000/sales_bot';

	useEffect(() => {
		localStorage.setItem('dataHistory', JSON.stringify(dataHistory));

		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [dataHistory]);

	// on first name
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				if (firstnameData) {
					console.log('first name received', firstnameData);
					setTitleText(['primary contact info']);
					const postData = {
						step_name: 'primary contact info',
						first_name: firstnameData,
						screenshot_data: screenshotData,
					};
					console.log('post data: ', postData);
					const response = await axios.post<ApiResponse>(apiUrl, postData);
					setDataHistory([...dataHistory, response.data]);
					console.log('api called with first name, data received:', response.data);
					console.log('data history: ', dataHistory);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [firstnameData]);

	// on load set default request with stepname
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			setLoading(true);
	// 			// sales script api url
	// 			console.log(titleText);
	// 			const postData = {
	// 				step_name: 'installation',
	// 				screenshot_data: '',
	// 			};
	// 			const response = await axios.post<ApiResponse>(apiUrl, postData);
	// 			// setDataHistory([response.data]);
	// 			setDataHistory((prevDataHistory) => [...prevDataHistory, { title: 'installation', data: response.data }]);
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	// send input value to post request on send button click
	const handleSendClick = async () => {
		try {
			setLoading(true);
			const inputValue = inputRef.current?.value || 'add-ons';
			setTitleText([inputValue]);
			console.log(titleText);
			const postData = {
				step_name: 'primary contact info',
				first_name: firstnameData,
				screenshot_data: screenshotData,
			};
			const response = await axios.post<ApiResponse>(apiUrl, postData);
			setDataHistory([...dataHistory, response.data]);
			// setDataHistory((prevDataHistory) => [...prevDataHistory, { title: inputValue, data: response.data }]);
			console.log(response.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// continue button action
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			setLoading(true);
	// 			if (screenshotData) {
	// 				const inputValue = 'Internet Plans';
	// 				setTitleText([inputValue]);
	// 				console.log(titleText);
	// 				const postData = {
	// 					step_name: inputValue,
	// 					screenshot_data: screenshotData,
	// 				};
	// 				const response = await axios.post<ApiResponse>(apiUrl, postData);
	// 				// setDataHistory([...dataHistory, response.data]);
	// 				setDataHistory((prevDataHistory) => [...prevDataHistory, { title: inputValue, data: response.data }]);
	// 				console.log(response);
	// 				console.log('api called with screenshot');
	// 			}
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	// console.log('received image details here: ', screenshotData);
	// 	fetchData();
	// }, [screenshotData]);

	return (
		<div ref={chatContainerRef} style={{ height: '400px', overflowY: 'auto' }}>
			<div className="text-black leading-6 mt-2 mb-4">
				<h3 className="m-0 text-[18px] font-semibold capitalize">{titleText}</h3>
			</div>
			{dataHistory.map((data, historyIndex) => (
				<div key={historyIndex}>
					<div className="text-black text-sm leading-5 mt-2 mb-4">
						{data && data.instruction && <p className="m-0">{data.instruction}</p>}
					</div>
					<div className="mb-4">
						{data && data['dialog script'] && (
							<div className="text-black text-sm leading-5 items-stretch rounded-t-3xl rounded-br-3xl shadow-sm bg-sky-200 justify-center mt-2 mb-4 p-4">
								<p className="m-0">{data['dialog script']}</p>
							</div>
						)}
						{/* {data &&
							data['dialog script'] &&
							data['dialog script']?.map((dialog: any, index: any) => (
								<div
									key={index}
									className="text-black text-sm leading-5 items-stretch rounded-t-3xl rounded-br-3xl shadow-sm bg-sky-200 justify-center mt-2 mb-4 p-4"
								>
									<p className="m-0">{dialog}</p>
								</div>
							))} */}
					</div>
				</div>
			))}
			<div>
				{loading && <p className="text-black text-sm leading-5 mt-2">Loading...</p>}
				<div className="mt-2 flex gap-2">
					<input
						type="text"
						name="inputStep"
						ref={inputRef}
						placeholder="Enter step name"
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
					/>
					<button
						type="button"
						onClick={handleSendClick}
						className="rounded bg-[#f8c246] px-3 py-1.5 text-gray-900 shadow-sm hover:bg-[#f8c246] "
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ScriptTabContent;
