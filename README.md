# GraphQL Question Types Example

This project demonstrates practical usage of GraphQL with multiple question types based on an `AbstractQuestion` type. The question types include:

- `MultipleChoiceQuestion`
- `OpenEndedQuestion`
- `TrueFalseQuestion`
- `RankQuestion`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- pnpm (If you don't have pnpm installed, you can install it by running `npm install -g pnpm`)

### Installation
Install the project dependencies: `pnpm install`

### Running the Application

Start the application in development mode by running: `pnpm run start`

The application will be accessible at `http://localhost:1234/graphql`

## Usage

To query the questions, access http://localhost:1234/graphql, use the following GraphQL query:
```gql
query GetQuestions {
  questions {
    ...on AbstractQuestion {
    	type
      id
      problem
      description
    }
    ... on MultipleChoiceQuestion {
      multipleChoiceQuestionAnswer: answer
    	options {
        label
        value
      }
    }
    ... on OpenEndedQuestion {
      openEndedQuestionAnswer: answer
    }
  	... on RankQuestion {
      rankQuestionAnswer: answer
    }
    ... on TrueFalseQuestion {
      trueFalseQuestionAnswer: answer
    }
  }
}
```
