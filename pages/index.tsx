import NextLink from "next/link";

export default function Index() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <h1>JMC Submission Portal</h1>
        <p>Press the button corresponding to the test you wish to submit.</p>
        <div className="space-x-8">
          <NextLink href="/jmc10">
            <a className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg py-1.5 px-10">
              JMC 10
            </a>
          </NextLink>
          <NextLink href="/jmc12">
            <a className="bg-blue-700 hover:bg-blue-600 active:bg-blue-800 rounded-md bg-opacity-90 text-gray-100 text-lg py-1.5 px-10">
              JMC 12
            </a>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
