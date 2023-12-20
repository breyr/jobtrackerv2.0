"use server"

import { getXataClient } from "@/xata";
import { contains, iContains } from "@xata.io/client";
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

// import xata client
const xataClient = getXataClient();

// create functions to get data for each card
export async function getCardData(userId: string) {
    noStore(); // disable caching for this function
    const totalApplicationsPromise = xataClient.db.applications.filter({userId: userId}).getMany();
    const totalAppliedPromise = xataClient.db.applications.filter({userId: userId, status: "applied"}).getMany();
    const totalInterviewsPromise = xataClient.db.applications.filter({userId: userId, status: "interview"}).getMany();
    const totalOffersPromise = xataClient.db.applications.filter({userId: userId, status: "offer"}).getMany();
    const totalRejectedPromise = xataClient.db.applications.filter({userId: userId, status: "rejected"}).getMany();

    const data = await Promise.all([totalApplicationsPromise, totalAppliedPromise, totalInterviewsPromise, totalOffersPromise, totalRejectedPromise]);

    const totalApplications = Number(data[0].length ?? '0');
    const totalApplied = Number(data[1].length ?? '0');
    const totalInterviews = Number(data[2].length ?? '0');
    const totalOffers = Number(data[3].length ?? '0');
    const totalRejected = Number(data[4].length ?? '0');

    return {
        totalApplications,
        totalApplied,
        totalInterviews,
        totalOffers,
        totalRejected
    }
}

// create function to get data for the table
export async function getTableData(userId: string, query:string, sortColumns: object) {
    noStore(); // disable caching for this function
    const { applications } = xataClient.db;
    let records =  applications
        .any(
            applications.filter({company: iContains(query)}),
            applications.filter({position: iContains(query)}),
            applications.filter({status: iContains(query)}),
            applications.filter({notes: iContains(query)})
        )
        .filter({userId: userId})
    for (let [column, order] of Object.entries(sortColumns)) {
        if (order === '') continue;
        records = records.sort(column, order); // this is fine, shouldn't error out
    }
    const sortedRecords = await records.getMany();
    return sortedRecords;
}

// create function to delete an application
export async function deleteApplication(formData: FormData) {
    const id = formData.get('id')?.toString();
    if (!id) return; // if no id, then return - this should never happen
    await xataClient.db.applications.delete(id);
    revalidatePath('/');
}

// create function to add an application
export async function addApplication(formData: FormData) {
    const company = formData.get('company')?.toString();
    const position = formData.get('position')?.toString();
    const status = formData.get('status')?.toString();
    const notes = formData.get('notes')?.toString();
    const userId = formData.get('userId')?.toString();
    const postingLink = formData.get('postingLink')?.toString();
    const dateStr = formData.get('date')?.toString();
    const date = dateStr ? new Date(dateStr) : "";
    if (!company || !position || !status || !userId || !date) return; // if any of these are missing, then return - this should never happen
    const newApplication = {
        position,
        userId,
        company,
        postingLink,
        status,
        notes,
        lastUpdated: date
    }
    await xataClient.db.applications.create(newApplication);
    revalidatePath('/');
}

// create function to update an application
export async function updateApplication(formData: FormData) {
    const id = formData.get('id')?.toString();
    const company = formData.get('company')?.toString();
    const position = formData.get('position')?.toString();
    const status = formData.get('status')?.toString();
    const notes = formData.get('notes')?.toString();
    const postingLink = formData.get('postingLink')?.toString();
    const dateStr = formData.get('date')?.toString();
    const date = dateStr ? new Date(dateStr) : new Date();
    if (!id || !company || !position || !status || !date) return; // if any of these are missing, then return - this should never happen
    const updatedApplication = {
        position,
        company,
        postingLink,
        status,
        notes,
        lastUpdated: date
    }
    await xataClient.db.applications.update(id, updatedApplication);
    revalidatePath('/');
}