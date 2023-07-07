exports.getPaginatedData = async function (
    model,
    reqQuery,
  ) {
    try {
      const {
        query,
        pagination,
        populate,
        lean,
        sort = "-createdAt",
        modFunction,
        select="+_id"
      } = reqQuery;
  
      let { limit, page } = reqQuery;
  
      page = page && page > 0 ? parseInt(page) : 1;
      limit = limit ? parseInt(limit) : 20;
      const skipping = (page - 1) * limit;
  
      const results = pagination
        ? await model
            .find(query)
            .sort(sort || "_id")
            .skip(skipping)
            .limit(limit)
            .populate(populate || "")
            .select(select)
            .lean(lean)
        : await model
            .find(query)
            .sort(sort || "_id")
            .populate(populate || "")
            .select(select)
            .lean(lean);
  
      const count = await model?.count(query);
  
      return {
        count,
        results: modFunction
          ? await Promise.all(results.map(modFunction))
          : results,
      };
    } catch (err) {
      throw err;
    }
  };