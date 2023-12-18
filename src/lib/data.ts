import { getXataClient } from "@/xata";
import { unstable_noStore as noStore } from 'next/cache';

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
export async function getTableData(userId: string) {
    noStore(); // disable caching for this function
    const applications = await xataClient.db.applications.filter({userId: userId}).getMany();
    return applications;
}

// create function to delete an application
export async function deleteApplication(applicationId: string) {
    await xataClient.db.applications.delete(applicationId);
}
