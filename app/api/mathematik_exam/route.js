import { NextResponse } from 'next/server';
import examData from '../../data/mathematik_exam.json';

export async function GET() {
  return NextResponse.json(examData);
}
