const calculateChunkRequests = (maxChunkPerReuqest:number, totalChunk:number) => Math.ceil(maxChunkPerReuqest/totalChunk)
export default calculateChunkRequests
