const innitialState = {
	data: [],
	totalPage: null,
	pageNow: null,
	alamat: {
		provinsi: [],
		kabupaten: [],
		kecamatan: [],
		kelurahan: [],
	},
	oneData: null,
};

const Karyawan = (state = innitialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "GET_ADDRESS":
			return {
				...state,
				alamat: {
					...state.alamat,
					[payload.scope]: payload.data,
				},
			};
		case "EDIT_KARYAWAN":
			const itemIndex = state.data.findIndex((item) => item.id === payload.id);
			const newData2 = [...state.data.slice(0, itemIndex), payload, ...state.data.slice(itemIndex + 1)];
			return {
				...state,
				data: newData2,
			};
		case "GET_KARYAWAN":
			return {
				...state,
				...payload,
			};
		case "GET_KARYAWAN_KTP":
			return {
				...state,
				oneData: payload,
			};
		default:
			return state;
	}
};

export default Karyawan;
