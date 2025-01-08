export const createChatSlice = (set , get) => ({
    selectedChatType:undefined , 
    selectedChatData:undefined ,
    selectedChatMessages:[] ,
    setSelectedChatType : (selectedChatType) => set({selectedChatType}) , 
    setSelectedChatData : (selectedChatData) => set ({selectedChatData}) ,
    setSelectedChatMessages : (selectedChatMessages) => ({selectedChatMessages}) ,
    closeChat : () => set({selectedChatData:undefined , selectedChatType:undefined , selectedChatMessages:[]})
})