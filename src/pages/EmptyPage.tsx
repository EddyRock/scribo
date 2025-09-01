function EmptyPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[400px]">
        <h1 className="text-4xl font-bold text-gray-800 text-center">No Folder Selected</h1>
        <p className="text-gray-500 text-center mt-2">
          You haven't selected any folder yet. Choose a folder from the sidebar or create a new one.
        </p>
      </div>
    </div>
  );
}
export default EmptyPage;
