const parsedYoutubeCommentThread = (data: YoutubeCommentThread[]): { [key: string]: string } => 
  data.reduce((acc, {snippet: {topLevelComment: {snippet: {authorDisplayName, textDisplay}}}}) => {
    acc[authorDisplayName] = textDisplay;
    return acc;
  }, {} as { [key: string]: string });


export default parsedYoutubeCommentThread
