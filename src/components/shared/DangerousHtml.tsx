const DangerousHtml = ({ props }: { props: string }) => {
  return (
    <div
      className=" text-[16px] 
        font-normal 
        leading-[125%] 
        mt-[50px]
        break-words
        whitespace-normal
        overflow-hidden space-y-2"
      dangerouslySetInnerHTML={{ __html: props }}
    />
  );
};

export default DangerousHtml;
