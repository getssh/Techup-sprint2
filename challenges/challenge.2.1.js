/* eslint-disable no-unused-vars */
import { Job, Candidate, Skill } from '../common/model.js';

/**
 * Part 1: Basic utility functions.
 *
 * The challenge is to create optimal solutions for implementing some of the
 * common utility functions that we will need to build our ATS solution.
 *
 *
 */

/**
 * Filter the given jobs list and return only jobs that start between the given
 * start and end dates.
 *
 * @param {Array<Job>} jobs
 * @param {Date} startDate
 * @param {Date} endDate
 */
const filterByDate = (jobs, startDate, endDate) => {
  // ----- Challenge 2.1.1 - Complete the function here ---- //
  const filteredJobs = jobs.filter((job) => {
    return job.startDate >= startDate && job.startDate <= endDate;
  });

  return filteredJobs;
};

/**
 * Filter the given candidates list and return only candidates that are born
 * on or after the given date.
 *
 * @param {Array<Candidate>} candidates
 * @param {Date} date
 */
const filterByBornAfter = (candidates, date) => {
  // ----- Challenge 2.1.2 - Complete the function here ---- //
  const bornFilter = candidates.filter((candidate) => {
    return candidate.dateOfBirth >= date;
  });

  return bornFilter;
};

/**
 * Sort the given candidate list, so that candidates with most skills,
 * regardless of the levels, are at the beginning.
 *
 * @param {*} candidateList
 * @returns
 */
const orderBySkills = (candidateList) => {
  // ----- Challenge 2.1.3 - Complete the function here ---- //
  const mostSkills = [];
  const mostSkillCandidate = [];

  candidateList.forEach((candidate) => {
    const skil = candidate.skills;
    mostSkills.push(skil.length);
    skil.length >= Math.max(...mostSkills)
      ? mostSkillCandidate.unshift(candidate)
      : mostSkillCandidate.push(candidate);
  });

  return mostSkillCandidate;
};

/**
 * Sort the given candidate list, so that candidates with more valuable skills,
 * are at the beginning.
 * Each skill will be weighed as follows: Expert levels count as 10, Advanced levels count as 5, Beginner levels count as 1
 *
 * @param {Array<Candidate>} candidateList
 * @returns
 */
const orderByWeightedSkills = (candidateList) => {
  // ----- Challenge 2.1.4 - Complete the function here ---- //
  const skillLevel = { 0: 1, 1: 5, 2: 10 };

  candidateList.forEach((candidate) => {
    candidate.weightedSkillSum = candidate.skills.reduce((sum, skill) => sum + skillLevel[skill.level], 0);
  });

  candidateList.sort((a, b) => b.weightedSkillSum - a.weightedSkillSum);
  candidateList.forEach((candidate) => {
    delete candidate.weightedSkillSum;
  });

  return candidateList;
};

/**
 * Return the ratio of female/male candidates in the list
 * @param {Array<Candidate>} candidateList
 * @returns a floating point number indicating the ratio
 */

const genderRatio = (candidateList) => {
  // ----- Challenge 2.1.5 - Complete the function here ---- //
  let maleCount = 0;
  let femaleCount = 0;

  candidateList.forEach((candidate) => {
    if (candidate.gender === 'M') {
      maleCount++;
    } else {
      femaleCount++;
    }
  });

  return parseFloat((femaleCount / maleCount).toFixed(2));
};

/**
 * Return the month with the highest number of jobs starting,
 * indicated by the startDate property of each Job.
 * @param {Array<Job>} jobs
 * @returns number (0-11)
 */

const busiestMonth = (jobs) => {
  // ----- Challenge 2.1.6 - Complete the function here ---- //
  const frequency = new Array(12).fill(0);

  jobs.forEach((job) => {
    const month = job.startDate.getMonth();
    frequency[month]++;
  });

  let busiestMonth = 0;
  for (let i = 1; i < frequency.length; i++) {
    if (frequency[i] > frequency[busiestMonth]) {
      busiestMonth = i;
    }
  }

  return busiestMonth;
};

/**
 * Return the skill name that is required the most in the given list of Jobs,
 * indicated by the requiredSkills property of each Job.
 *
 * @param {Array<Job>} jobs
 */
const mostInDemandSkill = (jobs) => {
  // ----- Challenge 2.1.7 - Complete the function here ---- //
  const requiredSkillFreq = {};
  jobs.forEach((job) => {
    job.requiredSkills.forEach((skill) => {
      skill.name in requiredSkillFreq ? requiredSkillFreq[skill.name] += 1 : requiredSkillFreq[skill.name] = 1;
    });
  });
  const values = Object.values(requiredSkillFreq);
  const maxValue = Math.max(...values);
  const mostFrequentSkill = Object.entries(requiredSkillFreq).find(([k, v]) => v === maxValue)?.[0];

  return mostFrequentSkill;
};

export { filterByDate, filterByBornAfter, orderBySkills, orderByWeightedSkills, genderRatio, busiestMonth, mostInDemandSkill };
