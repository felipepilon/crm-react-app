import { AbilityBuilder } from '@casl/ability';

export default (ability, user) => {
    const { can, cannot, rules } = new AbilityBuilder();

    if (!user.authenticated) 
    {
        cannot('manage', 'all');
    }
    else if (user.role === 'Sys Admin') 
    {
        can('manage', 'all');
    }
    else if (user.role === 'Manager') 
    {
        can('read', 'Customers');
        can('read', 'Stores');
        can('read', 'StoreGroups');
    }

    ability.update(rules);
};