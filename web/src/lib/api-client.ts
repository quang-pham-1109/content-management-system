// interface FetchDataProps {
//   method: string;
//   path: string;
//   name: string;
//   body?: Record<string, unknown>;
// }

// interface FetchError extends Error {
//   status: number;
//   timestamp: Date;
//   error: string;
// }

// export async function fetchData<T>({
//   method = "GET",
//   path,
//   name,
//   body,
// }: FetchDataProps): Promise<T | FetchError> {
//   try {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${userMe?.accessToken}`,
//       Accept: "application/json",
//     };

//     const formattedBody = body ? JSON.stringify(body) : undefined;

//     const response = await fetch(`${API_URL}${path}`, {
//       method,
//       signal,
//       headers: headers,
//       body: formattedBody,
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       if (
//         error.status === 401 ||
//         error.statusText === "Unauthorized" ||
//         error.statusText === "Invalid token"
//       ) {
//         try {
//           const data = await refreshUserToken(userData?.refreshToken);
//           setUserState(data);
//         } catch {
//           logoutWithReason("Expired" as LogoutReasonStatus);
//         }
//       } else {
//         return {
//           status: response.status,
//           timestamp: new Date(),
//           error:
//             error?.error ??
//             `Failed while trying to fetch ${path} ${
//               response.statusText ?? null
//             }`,
//           name: name,
//         };
//       }

//       throw new Error("response failed");
//     }

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     return await response.json();
//   } catch (err) {
//     const error = err as Error;
//     if (error.name === "AbortError") {
//       console.error(`Error aborted by ${name} data`);
//     } else {
//       console.error(`Error fetched by ${name} data:`, error.message);
//     }

//     throw error; // Re-throw the error for potential handling by the atomWithQuery
//   }
// }
