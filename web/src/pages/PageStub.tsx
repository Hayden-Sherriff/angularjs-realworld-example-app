// Shared placeholder used by the Wave 1 stub pages. Wave 2 feature sessions
// replace each page under src/pages/ with a real implementation.
export function PageStub({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <h1>{title}</h1>
          <p>{description ?? 'This page will be implemented in Wave 2.'}</p>
        </div>
      </div>
    </div>
  );
}

export default PageStub;
