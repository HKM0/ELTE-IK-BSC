import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import type { User, TableData, Booking } from '../types';

export const roomlieApi = createApi({
    reducerPath: 'roomlieApi',
    tagTypes: ['Tables', 'Bookings', 'Auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }


            const neptunCode = import.meta.env.VITE_NEPTUN_CODE;
            const baseUrl = import.meta.env.VITE_API_URL ?? '';

            // url eles szerver check
            const isProduction = baseUrl.includes('elore-megadott-cel-domain');

            if (neptunCode && isProduction) {
                headers.set('X-Neptun-Code', neptunCode);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        // auth
        login: builder.mutation<{ token: string; user: User }, { email: string; password: string }>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),
        register: builder.mutation<{ token: string; user: User }, { name: string; email: string; password: string }>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),

        // aszal kezeles
        getTables: builder.query<TableData[], void>({
            query: () => '/tables',
            transformResponse: (response: any[]) => response.map(table => ({
                ...table,
                'is-locked': table['is-locked'] ?? table.isLocked ?? false,
                position: table.position ?? { x: table.x ?? 0, y: table.y ?? 0 }
            })),
            providesTags: ['Tables'],
        }),

        updateTablePosition: builder.mutation<TableData, { id: number; x: number; y: number }>({
            query: ({ id, x, y }) => ({
                url: `/tables/${id}/position`,
                method: 'PATCH',
                body: {
                    x: Math.round(x),
                    y: Math.round(y)
                },
            }),
            async onQueryStarted({ id, x, y }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    roomlieApi.util.updateQueryData('getTables', undefined, (draft) => {
                        const table = draft.find(t => t.id === id);
                        if (table) {
                            table.position = { x: Math.round(x), y: Math.round(y) };
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ['Tables'],
        }),

        createTable: builder.mutation<TableData, Omit<TableData, 'id'>>({
            query: (body) => {
                const { 'is-locked': isLocked, ...rest } = body as any;
                return {
                    url: '/tables',
                    method: 'POST',
                    body: { ...rest, isLocked: isLocked ?? false },
                };
            },
            invalidatesTags: ['Tables'],
        }),


        /*
        updateTable: builder.mutation<TableData, { id: number } & Partial<TableData>>({
            query: ({ id, ...body }) => {
                const { 'is-locked': isLocked, ...rest } = body as any;
                const transformedBody = { ...rest } as any;

                if (isLocked !== undefined) {
                    transformedBody.isLocked = isLocked;
                }

                return {
                    url: `/tables/${id}`,
                    method: 'PATCH',
                    body: transformedBody,
                };
            },
            invalidatesTags: ['Tables'],
        }),
        */


        updateTable: builder.mutation<TableData, { id: number } & Partial<TableData>>({
            query: ({ id, ...body }) => {
                const { 'is-locked': isLocked, ...rest } = body as any;
                const transformedBody = { ...rest } as any;

                if (isLocked !== undefined) {
                    transformedBody.isLocked = isLocked;
                }

                return {
                    url: `/tables/${id}`,
                    method: 'PATCH',
                    body: transformedBody,
                };
            },

            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    roomlieApi.util.updateQueryData('getTables', undefined, (draft) => {
                        const table = draft.find(t => t.id === id);
                        if (table) {
                            if (patch.position) table.position = patch.position;
                            if (patch['is-locked'] !== undefined) table['is-locked'] = patch['is-locked'];
                            if (patch.status !== undefined) table.status = patch.status;
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ['Tables'],
        }),

        deleteTable: builder.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/tables/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tables'],
        }),

        // idopont es foglalas
        getTimeslots: builder.query<{ time: string; available: boolean }[], { tableId: number; date: string }>({
            query: ({ tableId, date }) => `/tables/${tableId}/timeslots?date=${date}`,
            transformResponse: (response: any[]) => {
                if (!Array.isArray(response)) return [];
                return response.map(t => {
                    let timeStr = '';
                    let isAvailable = true;

                    if (typeof t === 'string') {
                        timeStr = t;
                    } else if (t && typeof t === 'object') {
                        if (t.startTime && t.endTime) {
                            timeStr = `${t.startTime}-${t.endTime}`;
                        } else {
                            timeStr = t.time ?? t.timeslot ?? t.slot ?? JSON.stringify(t);
                        }

                        isAvailable = t.isAvailable ?? t.available ?? t.free ?? true;
                    }

                    return {
                        time: timeStr,
                        available: !!isAvailable
                    };
                });
            },
            providesTags: ['Bookings'],
        }),

        createBooking: builder.mutation<Booking, any>({
            query: (body) => {
                const { timeslot, ...rest } = body;

                const [startTime, endTime] = (timeslot ?? '').split('-');

                return {
                    url: '/bookings',
                    method: 'POST',
                    body: {
                        ...rest,
                        startTime: startTime ?? '',
                        endTime: endTime ?? ''
                    },
                };
            },
            invalidatesTags: ['Bookings'],
        }),

        getMyBookings: builder.query<Booking[], void>({
            query: () => '/bookings/my',
            transformResponse: (response: any[]) => response.map(b => ({
                ...b,
                timeslot: b.timeslot ?? `${b.startTime}-${b.endTime}`
            })),
            providesTags: ['Bookings'],
        }),

        getAllBookings: builder.query<Booking[], void>({
            query: () => '/bookings',
            transformResponse: (response: any[]) => response.map(b => ({
                ...b,
                timeslot: b.timeslot ?? `${b.startTime}-${b.endTime}`
            })),
            providesTags: ['Bookings'],
        }),

        updateBookingStatus: builder.mutation<Booking, { id: number; status: 'accepted' | 'declined' }>({
            query: ({ id, status }) => ({
                url: `/bookings/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Bookings'],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetTablesQuery, useCreateTableMutation,
    useUpdateTableMutation, useDeleteTableMutation, useGetTimeslotsQuery, useCreateBookingMutation,
    useGetMyBookingsQuery, useGetAllBookingsQuery, useUpdateBookingStatusMutation, useUpdateTablePositionMutation } = roomlieApi;