const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: '18.203.236.212',
  database: 'postgres',
  password: 'qwertyuiop',
  port: 5432,
})

client.connect()

const getQuestionText = async (questionNumber, questions, answers) => {
  console.log('>>>', questionNumber, questions)

  try {
    console.log(answers)
    const answersWhere = questions.map((question, i) => `'${question}' ${answers[i] ? '' : '!'}= ${answers[i] ? 'any' : 'all'} (neighbors)`).join(' and ');
    const where = answers.length > 0 ? `where ${answersWhere}` : ''
    console.log('|||', where)
    const usedTypes = questions.map(type => `'${type}'`).join(',');
    const usedTypesQuery = questions.length > 0
      ? `where t not in (${usedTypes})`
      : '';

    const query = `
      with y as (
        with x as (
          select distinct(id), name, neighbors
          from (
            SELECT id, name, unnest(types) "type", neighbors
              FROM points_krk p
          ) y
          ${where}
        )
        select
          unnest(neighbors) as t,
          count(*),
          (select count(*) as c from points) as c
        from x
        group by t
        order by 2 desc
      )
      select * from y ${usedTypesQuery};
    `;

    const response = await client.query(query);

    const middlePoint = response.rows[0].c / 2





    let questionRow

    for (const row of response.rows) {
      questionRow = row

      if (row.count < middlePoint) {
        break
      }
    }

    console.log(questionRow)

    return {
      question: questionRow.t,
      questions: [...questions, questionRow.t],
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = getQuestionText;
